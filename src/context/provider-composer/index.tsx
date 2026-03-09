interface ProviderComposerProps {
    providers: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
    children: React.ReactNode;
}

export const ProviderComposer = ({ providers, children }: ProviderComposerProps) => {
    return (
        <>
            {providers.reduceRight((acc, Provider) => {
                return <Provider>{acc}</Provider>;
            }, children)}
        </>
    );
};
