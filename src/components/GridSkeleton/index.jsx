import { v4 as uuid } from "uuid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function GridSkeleton({ data = [], showFilter = false }) {
  return (
    <>
      {data.map((item) => {
        return (
          <Stack
            spacing={1}
            key={uuid()}
            className={`scale-90 p-5 ${
              showFilter
                ? "xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-full"
                : "xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-full"
            }`}
            cx={{
              transition: ".4s",
            }}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" height={100} />
            <Skeleton variant="rounded" height={100} />
          </Stack>
        );
      })}
    </>
  );
}

export default GridSkeleton;
