import React from "react"
import NavbarSection from "../Sections/NavbarSection"
import ToolCard from "../Components/ToolCard"
import { toolsData } from "../Data/ToolsData"

const ToolsPage = () => {
  return (
    <div className="w-full mt-[4rem] flex items-center justify-center">
      {toolsData?.map((item, idx) => {
        return <ToolCard key={idx} {...item} />
      })}
    </div>
  )
}

export default ToolsPage
