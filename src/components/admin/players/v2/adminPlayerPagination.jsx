import React, {useContext, useMemo} from "react";
import { Button, Pagination } from "@nextui-org/react";
import { PlayersContext } from "./playersProvider";
import { useRouter } from "next/navigation";

export default function AdminPlayerPagination() {

  const playerContext = useContext(PlayersContext)
  const router = useRouter()
  
  const totalPage = useMemo(() => {
    if(playerContext.playerCount === 0) return 0
    return Math.ceil(playerContext.playerCount / 10)
  },[playerContext.playerCount])

  const handlePageChange = (page) => {
    router.push('/admin/dashboard/players?page=' + page)
  }
  
  return (
    <section className="flex items-center justify-center mt-4">
      <Pagination
        total={totalPage}
        page={playerContext.currentPage}
        onChange={(page) => handlePageChange(page)}
      />
    </section>
  );
}