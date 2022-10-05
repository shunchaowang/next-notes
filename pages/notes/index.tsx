import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { title } from "process";
import { useState } from "react";
import { prisma } from "../../prisma/lib/prisma";

const style = {
    head: `text-center font-bold text-2x1 mt-4`,
    form: `w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col itesm-stretch`,
    input: `border-2 rounded border-gray-600 p-1`,
    textarea: `border-2 rounded border-gray-600 p-1`,
    button: `bg-blue-500 text-white rounded p-1`,
    table: `w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch`,
};

interface Notes {
    notes: {
        id: string;
        title: string;
        content: string;
    }[];
}

interface FormData {
    title: string;
    content: string;
    id: string;
}

const Home: NextPage<Notes> = ({ notes }: Notes) => {
    const [form, setForm] = useState<FormData>({
        title: "",
        content: "",
        id: "",
    });

    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const createNote = async (data: FormData) => {
        try {
            fetch("/api/notes/create", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(() => {
                // fake updating now, delete the old one
                if (data.id) {
                    deleteNote(data.id);
                }
                refreshData();
                setForm({ title: "", content: "", id: "" });
            });
        } catch (error) {
            console.log(error);
        }
    };

    const deleteNote = async (id: string) => {
        try {
            fetch(`/api/notes/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "DELETE",
            }).then(() => {
                refreshData();
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1 className={style.head}>Notes</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createNote(form);
                }}
                className={style.form}
            >
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                    className={style.input}
                />

                <textarea
                    placeholder="Content"
                    value={form.content}
                    onChange={(e) =>
                        setForm({ ...form, content: e.target.value })
                    }
                    className={style.textarea}
                />

                <button type="submit" className={style.button}>
                    Add +
                </button>
            </form>

            <div className={style.table}>
                <ul>
                    {notes.map((note) => (
                        <li
                            key={note.id}
                            className="border-b border-gray-600 p-2"
                        >
                            <div className="flex justify-between">
                                <div className="flex-1">
                                    <h3 className="font-bold">{note.title}</h3>
                                    <p className="text-sm">{note.content}</p>
                                </div>
                                <button
                                    className="bg-red-500 px-3 text-white rounded"
                                    onClick={() => deleteNote(note.id)}
                                >
                                    X
                                </button>
                                <button
                                    className="bg-blue-500 px-3 text-white rounded"
                                    onClick={() =>
                                        setForm({
                                            title: note.title,
                                            content: note.content,
                                            id: note.id,
                                        })
                                    }
                                >
                                    Update
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    const notes = await prisma?.note.findMany({
        select: {
            title: true,
            id: true,
            content: true,
        },
    });

    return {
        props: { notes },
    };
};
