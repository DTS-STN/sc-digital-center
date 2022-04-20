import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import BenefitCardHeaderActive from './BenefitCardHeaderActive'

const activeCanadaPensionPlan = {
  benefitType: 'CPP',
  benefitName: 'Canada Pension Plan',
  status: 'Active',
  statusDescription:
    'Your application is pending, we will notify you with decision',
  applicationDate: 'July 1, 2021',
  estimatedReviewCompletionDate: 'July 31, 2021',
  applicationType: 'Canada Pension Plan (CPP)',
  applicationDescription: 'Online application received',
  nextPaymentAmount: 734.34,
  nextPaymentDate: 'September 30, 2021',
  lastPaymentDate: 'August 30, 2021',
  pensionStartDate: 'August 1, 2021',
  payeeFullName: 'John Smith Doe',
  payeeAddress: '',
  payeePhoneNumber: '1-613-555-5455',
  accountNumber: 'XXXX-123',
  institutionNumber: '002',
  institutionName: 'Scotiabank',
  payerName: 'Government of Canada',
  paymentDepositDate: 'August 30, 2021',
  paymentStatus: 'Issued',
  paymentType: 'Direct Deposit',
  additionalInformation:
    'We will notify you as soon as we have process your application.',
  applicationStatus: 'Active',
  pendingBenefits: 'Retirement pension',
  benefitStatusProgress: 'Complete',
}

const activeCanadaPensionPlanCPPD = {
  benefitType: 'CPPD',
  benefitName: 'Canada Pension Plan Disability',
  status: 'Active',
  statusDescription:
    'Your application is pending, we will notify you with decision',
  applicationDate: 'July 1, 2021',
  estimatedReviewCompletionDate: 'July 31, 2021',
  applicationType: 'Canada Pension Plan (CPP)',
  applicationDescription: 'Online application received',
  nextPaymentAmount: 734.34,
  nextPaymentDate: 'September 30, 2021',
  lastPaymentDate: 'August 30, 2021',
  pensionStartDate: 'August 1, 2021',
  payeeFullName: 'John Smith Doe',
  payeeAddress: '',
  payeePhoneNumber: '1-613-555-5455',
  accountNumber: 'XXXX-123',
  institutionNumber: '002',
  institutionName: 'Scotiabank',
  payerName: 'Government of Canada',
  paymentDepositDate: 'August 30, 2021',
  paymentStatus: 'Issued',
  paymentType: 'Direct Deposit',
  additionalInformation:
    'We will notify you as soon as we have process your application.',
  applicationStatus: 'Active',
  pendingBenefits: 'Retirement pension',
  benefitStatusProgress: 'Complete',
}

const activeCppApi = {
  programCode: '32294',
  benefitCode: '30320',
  benefitType: 'Beneficial',
  benefitStatus: 'Active',
  lastPaymentDate: '2021-02-21',
  finalPaymentDate: '2024-02-13',
}

expect.extend(toHaveNoViolations)

describe('BenefitCardHeaderActive', () => {
  it('Renders BenefitCardHeaderActive', () => {
    render(
      <BenefitCardHeaderActive
        benefit={activeCanadaPensionPlan}
        api={activeCppApi}
        locale={'en'}
      />
    )
    const titleText = screen.getByText('Canada Pension Plan')
    const benefitStatusProgress = screen.getByText('Complete')
    const nextPaymentAmount = screen.getByText('Payment amount')

    expect(titleText).toBeInTheDocument()
    expect(benefitStatusProgress).toBeInTheDocument()
    expect(nextPaymentAmount).toBeInTheDocument()
  })

  it('Renders BenefitCardHeaderActive CPPD', () => {
    render(
      <BenefitCardHeaderActive
        benefit={activeCanadaPensionPlanCPPD}
        locale={'en'}
      />
    )
    const titleText = screen.getByText('Canada Pension Plan')
    expect(titleText).toBeInTheDocument()
    const titleTextDisability = screen.queryByText(
      'Canada Pension Plan Disability'
    )
    expect(titleTextDisability).toBeNull()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <BenefitCardHeaderActive
        benefit={activeCanadaPensionPlan}
        api={activeCppApi}
        locale={'en'}
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
