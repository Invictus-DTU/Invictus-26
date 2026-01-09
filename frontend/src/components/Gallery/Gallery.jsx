"use client";
import { useMemo, useState } from "react";
import { utils } from "swapy";
import { SwapyItem, SwapyLayout, SwapySlot } from "@/component/ui/swapy";
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
const initialItems = [
  {
    id: "1",
    title: "1",
    widgets: <ProjectViewsCard />,
    className: "lg:col-span-4 sm:col-span-7 col-span-12",
  },
  {
    id: "2",
    title: "2",
    widgets: <NewUsersCard />,
    className: "lg:col-span-3 sm:col-span-5 col-span-12",
  },
  {
    id: "3",
    title: "3",
    widgets: <DesignIndustryCard />,
    className: "lg:col-span-5 sm:col-span-5 col-span-12",
  },
  {
    id: "4",
    title: "4",
    widgets: <TeamCard />,
    className: "lg:col-span-5 sm:col-span-7 col-span-12",
  },
  {
    id: "5",
    title: "5",
    widgets: <LogoCard />,
    className: "lg:col-span-4 sm:col-span-6 col-span-12",
  },
  {
    id: "6",
    title: "6",
    widgets: <FontCard />,
    className: "lg:col-span-3 sm:col-span-6 col-span-12",
  },
  {
    id: "7",
    title: "7",
    widgets: <AgencyCard />,
    className: "lg:col-span-4 sm:col-span-5 col-span-12",
  },
  {
    id: "8",
    title: "8",
    widgets: <UserTrustCard />,
    className: "lg:col-span-4 sm:col-span-7 col-span-12",
  },
  {
    id: "9",
    title: "9",
    widgets: <CardBalanceCard />,
    className: "lg:col-span-4 sm:col-span-12 col-span-12",
  },
];
function Gallery() {
  const [category, setCategory] = useState("FUN");

  const categoryMap = {
    FUN: initialItems,
    CULTURAL: initialItems,
    WORKSHOP: initialItems,
  };

  const [slotItemMap, setSlotItemMap] = useState(
    utils.initSlotItemMap(initialItems, "id")
  );
  const slottedItems = useMemo(
    () => utils.toSlottedItems(initialItems, "id", slotItemMap),
    [initialItems, slotItemMap]
  );
  return (
  <div className={styles.galleryBackground}>
    <div className={styles.galleryWrapper}>

      {/* HEADER */}
      <div className={styles.galleryHeader}>

        {/* LEFT SIDE */}
        <div className={styles.titleBlock}>
          <h1 className={`${styles.galleryTitle} invictus-heading`}>GALLERY</h1>
          <p className={`${styles.galleryCaption} invictus-subheading`}>
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

          <div className={`${styles.categoryList} invictus-subheading`}>
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
              const item = initialItems.find((i) => i.id === itemId);
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
