import propTypes from 'prop-types'
import BenefitCardHeaderSummary from '../molecules/BenefitCardHeaderSummary'
import StatusBadge from '../atoms/StatusBadge'
import BenefitTasks from '../molecules/BenefitTasks'
import HorizontalRule from '../atoms/HorizontalRule'
import { useState } from 'react'
import ViewMoreLessButton from '../atoms/ViewMoreLessButton'

export default function BenefitCard(props) {
  const [isOpen, setIsOpen] = useState(false)
  const benefitCardId = 'benefit-card-' + props.benefit.id
  const taskListId = 'task-list-' + props.benefit.id

  return (
    <div className="benefit-card pb-6" id={benefitCardId}>
      <StatusBadge
        status={props.benefit.status.text}
        className={props.benefit.status.className}
      />
      <div className="px-4 md:px-6 pb-6">
        <div className="mx-auto sm:grid sm:grid-cols-4 sm:divide-x-2">
          <div className="col-span-1 py-4">
            <h3 className="font-bold font-display text-4xl sm:text-lg md:text-xl lg:text-3xl xl:text-4xl mb-2">
              {props.benefit.summary}
            </h3>
          </div>

          <div className="grid col-span-3">
            {props.benefit.summaries == null ||
            props.benefit.summaries.length <= 0 ? (
              <div className="mx-8">
                <p className="pb-5 text-lg">{props.benefitDurationReached}</p>
                <a
                  href=""
                  className="underline text-link-blue-default hover:text-link-blue-hover"
                >
                  <img
                    src="/images/dashboard/apply-for-benefit-icon.svg"
                    alt=""
                  />
                  <p className="w-36 sm:w-24 lg:w-36 pr-5 pt-3">
                    {`${props.applyFor} ${props.benefit.name}`}
                  </p>
                </a>
              </div>
            ) : (
              <ul className="grid col-span-2 gap-y-4 gap-x-1 sm:grid-cols-3 sm:pl-8 lg:pl-10 font-display">
                {props.benefit.summaries.map((summary, index) => {
                  return (
                    <BenefitCardHeaderSummary
                      key={index}
                      locale={'en'}
                      summary={summary}
                    />
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <HorizontalRule width="w-auto sm:w-full" />
      {/* Let the ViewMoreLessButton remain generic and set the heading level outside */}
      <h4>
        <ViewMoreLessButton
          id={props.benefit.code + '-card-button'}
          dataTestid={props.benefit.id}
          onClick={() => {
            const newOpenState = !isOpen
            const idToScrollTo = newOpenState ? taskListId : benefitCardId
            document.getElementById(idToScrollTo).scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
            setIsOpen(newOpenState)
          }}
          ariaExpanded={isOpen.toString()}
          icon={isOpen}
          caption={props.benefit.moreLessCaption}
        />
      </h4>
      <div className="flex flex-col">
        {props.benefit.taskGroups == null ||
        props.benefit.taskGroups.length <= 0 ? null : (
          <div id={taskListId} className="grid bg-gray-lighter sm:grid-cols-1 ">
            {!isOpen
              ? null
              : props.benefit.taskGroups.map((taskList, index) => {
                  return (
                    <div key={index}>
                      <BenefitTasks taskList={taskList} locale={'en'} />
                    </div>
                  )
                })}
          </div>
        )}
      </div>
    </div>
  )
}
BenefitCard.propTypes = {
  benefit: propTypes.shape({
    id: propTypes.string.isRequired,
    code: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    summary: propTypes.string.isRequired,
    status: propTypes.string.isRequired,
    summaries: propTypes.array,
    taskGroups: propTypes.array.isRequired,
    moreLessCaption: propTypes.string.isRequired,
  }),
  benefitDurationReached: propTypes.string.isRequired,
  applyFor: propTypes.string.isRequired,
}
