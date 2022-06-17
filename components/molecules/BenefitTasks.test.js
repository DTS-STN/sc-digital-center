import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import BenefitTasks from './BenefitTasks'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => (
    <children.type {...children.props} href={href} />
  ),
}))

jest.mock(
  'next/image',
  () =>
    function Image({ imageSrc, alt }) {
      return <img src={imageSrc} alt={alt} />
    }
)

expect.extend(toHaveNoViolations)

describe('BenefitTask', () => {
  const { container } = render(
    <BenefitTasks
      locale="en"
      taskList={{
        header: 'Common actions',
        tasks: [
          {
            task: 'View past payments',
            icon: '/images/dashboard/oas-payment-icon.svg',
            link: '/dashboard',
          },
          {
            task: 'View my status and messages',
            icon: '/images/dashboard/oas-updates-message-icon.svg',
            link: '/dashboard',
          },
        ],
      }}
    />
  )

  it('renders BenefitTask', () => {
    const task1Text = screen.getByText('View past payments')
    const task2Text = screen.getByText('View my status and messages')

    expect(task1Text).toBeInTheDocument()
    expect(task2Text).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
