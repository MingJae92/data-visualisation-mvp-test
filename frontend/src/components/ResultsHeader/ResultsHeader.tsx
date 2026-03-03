import styles from './ResultsHeader.module.css'

interface Props {
  instance: { id: string; element: string }
}

export default function ResultsHeader({ instance }: Props) {
  return (
    <header className={styles.resultsHeader} role="banner" aria-label={`Assessment Results for Element ${instance.element}`}>
      {/* Main heading */}
      <h1 className={styles.title}>
        Assessment Results — Element {instance.element}
      </h1>

      {/* Instance ID with screen-reader context */}
      <p className={styles.instanceId}>
        <span className="srOnly">Assessment Instance ID: </span>
        {instance.id}
      </p>
    </header>
  )
}