import styles from "../styles/counter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import undoImage from "../images/undo.png";
import redoImage from "../images/redo.png";
import {
  getCount,
  getPastCounts,
  getFutureCounts,
  INC_COUNT,
  DEC_COUNT,
} from "../store/count";

export default function Counter() {
  const dispatch = useDispatch();
  const count = useSelector(getCount);
  const pastCounts = useSelector(getPastCounts);
  const futureCounts = useSelector(getFutureCounts);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Count: {count}</div>
      <div>
        <button
          className={`${styles.btn} ${styles["btn-success"]}`}
          onClick={() => dispatch(INC_COUNT())}
        >
          +
        </button>
        <button
          className={`${styles.btn} ${styles["btn-danger"]}`}
          onClick={() => dispatch(DEC_COUNT())}
        >
          -
        </button>
      </div>
      <div>
        <button
          className={`${styles.btn} ${styles["btn-warning"]}`}
          onClick={() => dispatch({ type: "UNDO_COUNT" })}
          disabled={pastCounts.length === 0}
        >
          <Image src={undoImage} alt="undo" width="20px" height="20px"></Image>
        </button>
        <button
          className={`${styles.btn} ${styles["btn-info"]}`}
          onClick={() => dispatch({ type: "REDO_COUNT" })}
          disabled={futureCounts.length === 0}
        >
          <Image src={redoImage} alt="redo" width="20px" height="20px"></Image>
        </button>
      </div>
    </div>
  );
}
