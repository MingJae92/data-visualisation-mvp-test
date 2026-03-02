import styles from './ResultsHeader.module.css'

interface Props {
  instance: { id: string; element: string }
}

export default function ResultsHeader({ instance }: Props) {
  return (
    <div className={styles.resultsHeader}>
      <h2 className={styles.title}>Assessment Results - Element {instance.element}</h2>
      <p className={styles.instanceId}>Instance: {instance.id}</p>
    </div>
  )
}