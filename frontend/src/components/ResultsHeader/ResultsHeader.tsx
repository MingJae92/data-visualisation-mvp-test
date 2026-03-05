import styles from './ResultsHeader.module.css'

interface Props {
  instance: {
    id: string
    element: string
    responder_name: string
    created_at: string
    completed: boolean
    completed_at: string | null
  }
}

export default function ResultsHeader({ instance }: Props) {
  const formattedDate = new Date(instance.created_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <header className={styles.resultsHeader} role="banner" aria-label={`Assessment Results for Element ${instance.element}`}>

      {/* Main heading */}
      <h1 className={styles.title}>
        Assessment Results — Element {instance.element}
      </h1>

      {/* Responder name */}
      <p className={styles.responderName}>
        <span className="srOnly">Responder: </span>
        {instance.responder_name}
      </p>

      {/* Instance ID with screen-reader context */}
      <p className={styles.instanceId}>
        <span className="srOnly">Assessment Instance ID: </span>
        {instance.id}
      </p>

      {/* Date created */}
      <p className={styles.date}>
        <span className="srOnly">Date created: </span>
        {formattedDate}
      </p>

      {/* Completion status badge */}
      <span
        className={instance.completed ? styles.badgeComplete : styles.badgeInProgress}
        aria-label={`Status: ${instance.completed ? 'Completed' : 'In Progress'}`}
      >
        {instance.completed ? 'Completed' : 'In Progress'}
      </span>

    </header>
  )
}