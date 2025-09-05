interface PageProps {
    params:Promise<{idProduct:string}>;
}

export default async function ProductDetail({ params }: PageProps) {
    const { idProduct } = await params;
    return (
        <div>
            {/*aca renderizamos el id*/}
        </div>
    );
}