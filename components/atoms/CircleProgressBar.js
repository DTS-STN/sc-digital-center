import ProgressBar from 'react-customizable-progressbar'
import PropTypes from 'prop-types'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'

export default function CircleProgressBar(props) {
  const fullConfig = resolveConfig(tailwindConfig)

  return (
    <div className="-ml-4 absolute top-4 sm:inset-x-6">
      <ProgressBar
        progress={props.progress}
        steps={props.steps}
        radius={28}
        strokeColor={fullConfig.theme.colors.green['active']}
        strokeWidth={4}
        trackStrokeWidth={4}
      >
        <div className="relative">
          <p className="px-9 -py-20 absolute -top-24 h-24 grid content-center text-green-active font-bold font-display text-lg">
            {props.progress}
          </p>
        </div>
      </ProgressBar>
    </div>
  )
}

CircleProgressBar.propTypes = {
  progress: PropTypes.number,
  steps: PropTypes.number,
}
