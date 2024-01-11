import {Navbar} from "../components";

function ErrorPage() {
    return(<section>
        <Navbar />
        <div className={'container mt-3'}>
            <div className={'bg-white p-3 rounded'}>
                The requested Page is <b>NOT FOUND</b>.
            </div>
        </div>
    </section>)
}

export default ErrorPage;
