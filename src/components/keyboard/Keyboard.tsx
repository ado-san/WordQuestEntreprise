import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect, useRef } from 'react'
import { ORTHOGRAPHY } from '../../constants/orthography'
import { useTranslation } from 'react-i18next'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[][]
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
  const { t } = useTranslation()
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  // Keep the latest handlers in a ref so the physical keyboard listener is
  // registered once and never calls stale handlers when typing fast.
  const handlers = useRef({ onEnter, onDelete, onChar })
  handlers.current = { onEnter, onDelete, onChar }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        handlers.current.onEnter()
      } else if (e.code === 'Backspace') {
        handlers.current.onDelete()
      } else if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        // Physical keyboard: accept single-character letters of the orthography
        const key = e.key.toLowerCase()
        if (key.length === 1 && ORTHOGRAPHY.includes(key)) {
          handlers.current.onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [])

  return (
    <div>
      <div className="flex justify-center mb-1">
        {ORTHOGRAPHY.slice(0, Math.floor(ORTHOGRAPHY.length * 0.4)).map(
          (char) => (
            <Key
              key={char}
              value={char}
              onClick={onClick}
              status={charStatuses[char]}
            />
          )
        )}
      </div>
      <div className="flex justify-center mb-1">
        {ORTHOGRAPHY.slice(
          Math.floor(ORTHOGRAPHY.length * 0.4),
          Math.floor(ORTHOGRAPHY.length * 0.7)
        ).map((char) => (
          <Key
            key={char}
            value={char}
            onClick={onClick}
            status={charStatuses[char]}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key key="enterKey" width={65.4} value="ENTER" onClick={onClick}>
          {t('enterKey')}
        </Key>
        {ORTHOGRAPHY.slice(
          Math.floor(ORTHOGRAPHY.length * 0.7),
          ORTHOGRAPHY.length
        ).map((char) => (
          <Key
            key={char}
            value={char}
            onClick={onClick}
            status={charStatuses[char]}
          />
        ))}
        <Key key="deleteKey" width={65.4} value="DELETE" onClick={onClick}>
          {t('deleteKey')}
        </Key>
      </div>
    </div>
  )
}
