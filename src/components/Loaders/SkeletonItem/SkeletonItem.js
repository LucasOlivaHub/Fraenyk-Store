import { Skeleton } from "@mui/material";

function SkeletonItem() {
    return (
        <div className="skeletonitem-container">
            <Skeleton animation="wave" className="skeletonitem-1" variant="rounded" width={250} height={150}/>
            <Skeleton animation="wave" className="skeletonitem-2" variant="rounded" width={100} height={20}/>
        </div>
    ) 
}

export default SkeletonItem
