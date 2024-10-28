interface LoadingProps {
    Width?: string,
    Height?: string
}
function Loading({ Width = "2.5rem", Height = Width }: LoadingProps) {
    return (<>


        <div
            className="d-flex justify-content-center align-items-center  "
        >
            <div
                className="spinner-border text-primary loading-spinner spinner-border-lg d-block "
                role="status"
                style={{ width: Width, height: Height }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </>)
}
export default Loading;