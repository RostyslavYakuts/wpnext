import Navbar from '../components/global/navbar';
import '../../styles/tailwind.css';
import '../../styles/main.scss';
import Head from "next/head";
import Script from 'next/script';

export default function RootLayout({ children, metadata, assets}) {
	return (
        <html lang="en">
        <body>
        <Head>
            <title>Next JS ${metadata?.title}</title>
            <meta keywords={"next.js" + metadata?.keywords}></meta>
            <meta description={"next.js" + metadata?.description}></meta>
            {assets?.styles.map(style => (
                <link key={style.handle} rel="stylesheet" href={style.src} />
            ))}
        </Head>
        <Navbar/>
        <div className="container max-w-7xl mx-auto">
            <main className="p-6">
                {children}
            </main>
        </div>
        <footer>
            {assets?.scripts.map(script => (
                <Script
                    key={script.handle}
                    src={script.src}
                    strategy="afterInteractive"
                />
            ))}
        </footer>
        </body>
        </html>
	);
}
