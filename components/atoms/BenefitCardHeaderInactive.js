import en from '../../locales/en'
import fr from '../../locales/fr'
import HorizontalRule from './HorizontalRule'
import BenefitCode from '../../constants/BenefitCode'

export default function BenefitCardHeaderActive(props) {
  const t = props.locale === 'en' ? en : fr
  const getBenefitCardTitle = () => {
    if (props.benefit.benefitType === BenefitCode.cppd) {
      return t[BenefitCode.cpp.toLowerCase()]
    } else {
      return t[props.benefit.benefitType.toLowerCase()]
    }
  }

  return (
    <div className="px-4 md:px-6">
      <div className="flex mr-10 justify-end">
        <h2
          className={
            'font-bold font-display text-lg px-12 py-1 mb-5 rounded-b-md text-white bg-gray-inactive'
          }
        >
          {props.benefit.applicationStatus}
        </h2>
      </div>
      <div className="mx-auto sm:grid sm:grid-cols-4 sm:divide-x-2">
        <div
          id={`${props.benefit.benefitType}-inactive-title`}
          className="col-span-1 py-4 md:px-0 lg:px-3"
        >
          <div className="font-bold font-display text-4xl sm:text-2xl lg:text-4xl mb-2 w-44 sm:w-32 lg:w-44">
            {getBenefitCardTitle()}
          </div>
        </div>
        <HorizontalRule width="w-1/3" visibility="sm:hidden" />
        <div
          id={`${props.benefit.benefitType}-inactive-pastClaimOverview`}
          className="font-display py-4 sm:grid sm:pl-10"
        >
          <p className="font-bold text-lg mt-4">
            {`Your past ${props.benefit.benefitType} claim overview`}
          </p>
        </div>
      </div>
    </div>
  )
}
