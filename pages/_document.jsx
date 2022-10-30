import Document, { Html, Head, NextScript, Main } from 'next/document';

export default class indexDocument extends Document {
    render() {
        return(
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )  
    }
};