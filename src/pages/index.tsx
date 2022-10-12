import Link from "next/link"

const Home = () => {
    return (
        <div className="container p-4">
            <ul>
                <li>
                    <Link href="/notes">
                        <a>Note</a>
                    </Link>
                </li>
                <li>
                    <Link href="/persons">
                        <a>Person</a>
                    </Link>
                </li>
                <li>
                    <Link href="/persons/faker">
                        <a>Fake Person</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Home
