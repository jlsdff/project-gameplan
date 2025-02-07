import {
  Table,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  Skeleton,
} from "@heroui/react";

const UserSkeleton = () => {
  return (
  <div className="max-w-[300px] w-full flex items-center gap-3">
    <div>
      <Skeleton className="flex w-12 h-12 rounded-full" />
    </div>
    <div className="flex flex-col w-full gap-2">
      <Skeleton className="w-3/5 h-3 rounded-lg" />
      <Skeleton className="w-4/5 h-3 rounded-lg" />
    </div>
  </div>
  )
};

export default function TableSkeleton({ Columns = null, Rows = null }) {
  return (
    <Table removeWrapper aria-labelledby="loading">
      <TableHeader>
        {Columns ? (
          <Columns />
        ) : (
          [...Array(5)].map((_, i) => (
            <TableColumn key={i}>
              <Skeleton className="h-[16px] rounded-md" />
            </TableColumn>
          ))
        )}
      </TableHeader>
      <TableBody>
        {Rows ? (
          <Rows />
        ) : (
          [...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell><UserSkeleton/></TableCell>
              <TableCell><Skeleton className="h-3 rounded-md" /></TableCell>
              <TableCell><Skeleton className="h-3 rounded-md" /></TableCell>
              <TableCell><Skeleton className="h-3 rounded-md" /></TableCell>
              <TableCell><UserSkeleton /></TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
