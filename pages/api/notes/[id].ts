import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // we want to handle both delete and update here
    // get the param passed

    const id = req.query.id;

    // get the node
    // then perform the operation

    switch (req.method) {
        case "DELETE":
            const note = await prisma.note.delete({
                where: { id: Number(id) },
            });
            res.json(note);
            break;
        case "PUT":
            break;
        default:
            res.status(200).json({ message: "Method not allowed" });
            break;
    }
}
