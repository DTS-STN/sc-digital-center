import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import BenefitCardHeaderActive from '../atoms/BenefitCardHeaderActive'
import BenefitCardHeaderInactive from '../atoms/BenefitCardHeaderInactive'
import BenefitCardHeaderPending from '../atoms/BenefitCardHeaderPending'
import BenefitTasks from './BenefitTasks'
import ActiveBenefitDetails from './ActiveBenefitDetails'
import HorizontalRule from '../atoms/HorizontalRule'
import BenefitStatus from '../../constants/BenefitStatus'
import en from '../../locales/en'
import fr from '../../locales/fr'
import ViewMoreLessButton from '../atoms/ViewMoreLessButton'
import { getBenefitType } from '../organisms/DashboardUtils'
import BenefitCode from '../../constants/BenefitCode'

const BenefitCard = (props) => {
  const t = props.locale === 'en' ? en : fr
  const [isOpen, setIsOpen] = useState(false)
  const [btnCaption, setBtnCaption] = useState(t.viewMore)
  const topOfCardRef = useRef(null)
  const topOfTaskRef = useRef(null)
  const handleClick = () => {
    setBtnCaption(isOpen ? t.viewMore : t.viewLess)
    setIsOpen(!isOpen)
  }

  const getBenefitTypeName = () => {
    let benefitType
    if (props.benefit.benefitType === BenefitCode.cpp) {
      benefitType = getBenefitType(props.api.benefitType)
    } else if (props.benefit.benefitType === BenefitCode.ei) {
      benefitType = getBenefitType(props.api.enmBenefitType)
    } else {
      return props.benefit.pendingBenefits
    }
    return benefitType.map((i) => i.nameEn).toString()
  }

  const scrollTo = () => {
    if (!topOfTaskRef.current || !topOfCardRef.current) return
    isOpen
      ? topOfCardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      : topOfTaskRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
  }

  const renderBenefitHeader = () => {
    switch (props.benefit.status.toUpperCase()) {
      case BenefitStatus.active.toUpperCase():
        return (
          <BenefitCardHeaderActive
            benefit={props.benefit}
            api={props.api}
            locale={props.locale}
          />
        )
      case BenefitStatus.pending.toUpperCase():
        return (
          <BenefitCardHeaderPending
            benefit={props.benefit}
            locale={props.locale}
          />
        )
      case BenefitStatus.inactive.toUpperCase():
        return (
          <BenefitCardHeaderInactive
            benefit={props.benefit}
            locale={props.locale}
          />
        )
      default:
        return null
    }
  }

  const renderBenefitStatus = () => {
    switch (props.benefit.status.toUpperCase()) {
      case BenefitStatus.active.toUpperCase():
        return (
          <>
            <span className="font-bold">{t.activeBenefits}</span>
            <span className="ml-2">{getBenefitTypeName()}</span>
          </>
        )
      case BenefitStatus.pending.toUpperCase():
        return (
          <>
            <span className="font-bold">{t.pendingBenefits}</span>
            <span className="ml-2">{props.benefit.pendingBenefits}</span>
          </>
        )
      case BenefitStatus.inactive.toUpperCase():
        return (
          <span className="font-bold">
            {`You have no active ${props.benefit.benefitType} benefit`}
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="benefit-card" ref={topOfCardRef}>
      {/* Benefit Card Header */}
      {renderBenefitHeader()}

      {/* Pending benefits */}
      <HorizontalRule width="w-auto sm:w-full" />
      <div className="font-display text-lg ml-4 py-5 sm:ml-8">
        {renderBenefitStatus()}
      </div>
      <HorizontalRule width="w-auto sm:w-full" />

      {/* Top tasks */}
      <div ref={topOfTaskRef}>
        <BenefitTasks
          benefitType={props.benefit.benefitType}
          isExpanded={isOpen}
          tasks={props.tasks}
        />
      </div>
      {/* Benefit Card Details */}
      {isOpen &&
      props.benefit.status.toUpperCase() ===
        BenefitStatus.active.toUpperCase() ? (
        <ActiveBenefitDetails benefit={props.benefit} locale={props.locale} />
      ) : (
        <></>
      )}
      {!(
        props.benefit.status.toUpperCase() ===
          BenefitStatus.inactive.toUpperCase() && props.tasks.length < 6
      ) && (
        <ViewMoreLessButton
          onClick={() => {
            handleClick()
            scrollTo()
          }}
          plus={isOpen}
          caption={btnCaption}
        />
      )}
    </div>
  )
}

export default BenefitCard

BenefitCard.propTypes = {
  benefit: PropTypes.shape({
    benefitType: PropTypes.oneOf(['CPP', 'OAS', 'GIS', 'EI', 'CPPD']),
    benefitName: PropTypes.oneOf([
      'Canada Pension Plan',
      'Old Age Security',
      'Guaranteed Income Supplement',
      'Employment Insurance',
      'Canada Pension Plan Disability',
    ]),
    status: PropTypes.oneOf(['Active', 'Pending', 'Inactive']),
  }),
  api: PropTypes.shape({
    programCode: String,
    benefitCode: String,
    benefitType: String,
    benefitStatus: String,
    lastPaymentDate: String,
    finalPaymentDate: String,
    netAmount: Number,
    paymentProcessType: String,
    claimStatusCode: String,
    enmBenefitType: String,
    nextRptDueDate: String,
  }),
}
