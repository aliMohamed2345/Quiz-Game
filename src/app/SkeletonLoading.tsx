interface LoadingProps {
    Width?: string,
    Height?: string
}
function SkeletonLoading({ Width = "2.5rem", Height = Width }: LoadingProps) {
    return (<>


        <div
            className="d-flex justify-content-center align-items-center position-absolute translate-middle mx-auto translate-middle-x top-50   "
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
export default SkeletonLoading;