import styles from "../styles/counter.module.scss";
import { useDispatch, useSelector } from "react-redux";
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
          <img src="undo.png" width="20px" height="20px"></img>
        </button>
        <button
          className={`${styles.btn} ${styles["btn-info"]}`}
          onClick={() => dispatch({ type: "REDO_COUNT" })}
          disabled={futureCounts.length === 0}
        >
          <img src="redo.png" width="20px" height="20px"></img>
        </button>
      </div>
    </div>
  );
}
