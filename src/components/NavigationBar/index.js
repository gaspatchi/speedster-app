import React, { useRef, useCallback } from "react";
import { AnimateSharedLayout, motion } from "framer-motion";
import NavigationItem from "components/NavigationItem";
import { useClickAway } from "react-use";

const variants = {
	hidden: { opacity: 0, scale: 0.98, boxShadow: "0 0 10px rgba(0, 0, 0, 0)", borderRadius: 10 },
	visible: {
		opacity: 1,
		scale: 1,
		boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
		borderRadius: 18,
		transition: {
			type: "spring",
			delay: 0.3,
			duration: 0.3,
			opacity: {
				duration: 0.2,
			},
		},
	},
};

export function NavigationBar({ children, currentPage, setPage }) {
	const ref = useRef();
	const setInitialPage = useCallback(() => {
		if (currentPage !== "navigation") setPage("navigation");
	}, [currentPage, setPage]);
	useClickAway(ref, setInitialPage);

	return (
		<AnimateSharedLayout>
			<motion.div
				ref={ref}
				layout
				initial="hidden"
				animate="visible"
				variants={variants}
				className="NavigationBar"
			>
				<div className="NavigationBar__page">{children}</div>
				<motion.div layout className="NavigationBar__navigation">
					<NavigationItem
						type="navigation"
						active={currentPage === "navigation"}
						onClick={setPage}
					></NavigationItem>
					{/* <NavigationItem
						type="violation"
						active={currentPage === "violation"}
						onClick={setPage}
					></NavigationItem> */}
					<NavigationItem
						type="profile"
						active={currentPage === "profile"}
						onClick={setPage}
					></NavigationItem>
				</motion.div>
			</motion.div>
		</AnimateSharedLayout>
	);
}
