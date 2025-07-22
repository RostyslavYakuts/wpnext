'use client';

export default function WPContent({ html }) {
    return (
        <div className="" dangerouslySetInnerHTML={{ __html: html }} suppressHydrationWarning={true}/>
    );
}