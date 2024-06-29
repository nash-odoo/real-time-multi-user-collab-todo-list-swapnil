import React from "react"

interface ImageBundleProps {
  urls: string[]
  maxImages?: number
}

const ImageBundle = (props: ImageBundleProps) => {
  const { urls } = props
  return (
    <div className="flex items-center gap-x-1">
      {urls.map((url) => {
        return (
          <img
            src={url}
            alt={"assignee.name"}
            className="w-10 h-10 border-[2px] border-white rounded-full"
          />
        )
      })}
    </div>
  )
}

export default ImageBundle
