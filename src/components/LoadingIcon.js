import styles from './css/LoadingIcon.module.css'

function LoadingIcon() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingIcon}></div>
    </div>
  );
}

export default LoadingIcon;