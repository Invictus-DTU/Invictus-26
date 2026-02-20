import GalleryComponent from "@/components/Gallery/Gallery";
import SmoothScroll from "@/utils/smoothScroll";

export default function Gallery({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
  // throw new Error("test crash");

  return (
    <SmoothScroll>
    <GalleryComponent setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} />
    </SmoothScroll>
  )
}

