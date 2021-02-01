import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useCycle } from "framer-motion";

const variants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			type: "spring",
			delay: 0.3,
			duration: 0.5,
			bounce: 0.3,
			when: "beforeChildren",
			staggerChildren: 0.3,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.9,
		transition: {
			type: "spring",
			duration: 0.3,
			delay: 0.15,
		},
	},
};

const valueVariants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.9 },
};

export default function Sign() {
	const [speed, cyclespeed] = useCycle(20, 40, 60);
	const ref = useRef(null);
	useEffect(() => {
		ref.current = setInterval(() => {
			cyclespeed();
		}, 2500);
		return () => clearInterval(ref.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={variants}
			className="WelcomeRoadBackground__sign"
		>
			<div className="WelcomeRoadBackground__sign-scoreboard">
				<AnimatePresence exitBeforeEnter>
					<motion.div
						key={speed}
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={valueVariants}
						className="WelcomeRoadBackground__sign-scoreboard-value"
						transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
					>
						<div className="WelcomeRoadBackground__sign-scoreboard-value-number">
							{speed}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
			<div className="WelcomeRoadBackground__sign-pillar"></div>
		</motion.div>
	);
}
