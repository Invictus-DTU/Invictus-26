"use client";
import { useMemo, useState, useEffect } from "react";
import { utils } from "swapy";
import { SwapyItem, SwapyLayout, SwapySlot } from "@/component/ui/swapy";
import { Heart, PlusCircle } from "lucide-react";
import styles from "./Gallery.module.css";
export function ProjectViewsCard() {
  return (
    <div className="bg-emerald-600 rounded-xl h-full p-6 flex flex-col justify-center items-center text-center shadow-md">
    </div>
  );
}
export function NewUsersCard() {
  return (
    <div className="bg-gray-600 rounded-xl h-full p-6 flex flex-col justify-center shadow-md">
    </div>
  );
}
export function TeamCard() {
  return (
    <div className="bg-blue-100 rounded-xl p-6 h-full  flex flex-col justify-between relative overflow-hidden shadow-md">
    </div>
  );
}
export function AgencyCard() {
  return (
    <div className="bg-purple-300 rounded-xl h-full p-4 relative overflow-hidden shadow-md">
    </div>
  );
}
export function LogoCard() {
  return (
    <div className="bg-pink-200 rounded-xl h-full p-6 flex flex-col items-center justify-center shadow-md">
    </div>
  );
}
export function UserTrustCard() {
  return (
    <div className="bg-blue-600 rounded-xl h-full p-4 flex flex-col justify-center items-center text-white shadow-lg">
    </div>
  );
}
export function FontCard() {
  return (
    <div className="bg-yellow-200 rounded-xl h-full p-6 col-span-1 shadow-md">
    </div>
  );
}
export function DesignIndustryCard() {
  return (
    <div className="bg-emerald-600 text-yellow-200 rounded-xl h-full p-6 flex flex-col justify-between relative shadow-md">
    </div>
  );
}
export function CardBalanceCard() {
  return (
    <div className="bg-yellow-200 rounded-xl h-full p-6 shadow-lg">
    </div>
  );
}
const buildImageItems = (cat) => {
  return Array.from({ length: 9 }).map((_, index) => {
    const id = `${cat}-${index + 1}`;
    return {
      id,
      widgets: (
        <img
          src={`/Gallery pics/${cat}/cat${cat.slice(-1)}_${index + 1}.png`}
          alt={id}
          className="w-full h-full object-cover rounded-xl"
        />
      ),
      className: "lg:col-span-4 sm:col-span-6 col-span-12",
    };
  });
};
function Gallery() {
  const [category, setCategory] = useState("FUN");

  const categoryMap = {
    FUN: buildImageItems("cat1"),
    CULTURAL: buildImageItems("cat2"),
    WORKSHOP: buildImageItems("cat3"),
  };

  const activeItems = categoryMap[category];

  const [slotItemMap, setSlotItemMap] = useState(
    utils.initSlotItemMap(activeItems, "id")
  );

  useEffect(() => {
    setSlotItemMap(utils.initSlotItemMap(activeItems, "id"));
  }, [category]);

  const slottedItems = useMemo(
    () => utils.toSlottedItems(activeItems, "id", slotItemMap),
    [activeItems, slotItemMap]
  );
  return (
  <div className={styles.galleryBackground}>
    <div className={styles.galleryWrapper}>

      {/* HEADER */}
      <div className={styles.galleryHeader}>

        {/* LEFT SIDE */}
        <div className={styles.titleBlock}>
          <h1 className={styles.galleryTitle}>GALLERY</h1>
          <p className={styles.galleryCaption}>
            Moments that capture the energy, innovation, and unforgettable
            experiences of Invictus.
          </p>
        </div>

        {/* RIGHT SIDE – VIEW GLANCES */}
        <div className={styles.categoryBox}>
          <div className={styles.categoryHeader}>
            <span className={styles.categoryLabel}>VIEW GLANCES</span>
            <span className={styles.chevron}>⌄</span>
          </div>

          <div className={styles.categoryDivider} />

          <div className={styles.categoryList}>
            {["FUN", "CULTURAL", "WORKSHOP"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`${styles.categoryItem} ${
                  category === cat ? styles.activeCategory : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* SWAPY GRID */}
      <div className={styles.swapyWrapper}>
        <SwapyLayout
          id="swapy"
          className="w-full"
          config={{ swapMode: "hover" }}
          onSwap={(event) => {
            console.log("Swap detected!", event.newSlotItemMap.asArray);
          }}
        >
          <div className="grid w-full grid-cols-12 gap-6 py-6">
            {slottedItems.map(({ slotId, itemId }) => {
              const item = activeItems.find((i) => i.id === itemId) ?? activeItems[0];
              return (
                <SwapySlot
                  key={slotId}
                  id={slotId}
                  className={`rounded-xl h-64 ${item?.className}`}
                >
                  <SwapyItem
                    id={itemId}
                    className="relative rounded-xl w-full h-full"
                  >
                    {item?.widgets}
                  </SwapyItem>
                </SwapySlot>
              );
            })}
          </div>
        </SwapyLayout>
      </div>

    </div>
  </div>
);
}
export default Gallery;
