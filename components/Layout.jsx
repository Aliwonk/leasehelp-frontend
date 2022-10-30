import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <>{children}</>
        </>
    )
}