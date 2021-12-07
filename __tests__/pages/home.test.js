/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../../pages/home'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useRouter } from 'next/router'

// mocks useRouter to be able to use component' router.asPath
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// the code below is to avoid the following error:
//    "An update to Link inside a test was not wrapped in act(...)"
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
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={imageSrc} alt={alt} />
    }
)

expect.extend(toHaveNoViolations)

const aemPage = {
  title: {
    en: 'Home (en)',
    fr: 'Home (fr)',
  },
  meta: {
    keywords: {
      en: 'en keywords',
      fr: 'fr keywords',
    },
    description: {
      en: 'en description',
      fr: 'fr description',
    },
  },
}

describe('Home page', () => {
  const featured = {
    scTitleEn: { value: 'title' },
    scDescriptionEn: { value: 'description' },
  }

  const benefits = [
    {
      elements: {
        scPageNameEn: {
          value: 'Page Name 1',
        },
        scTitleEn: {
          value: 'Title 1',
        },
        scProgramEn: {
          value: 'Program 1',
        },
        scDescriptionEn: {
          value: 'Short Description 1',
        },
        scCallToActionEn: {
          value: 'Call to Action 1',
        },
      },
    },
    {
      elements: {
        scPageNameEn: {
          value: 'Page Name 2',
        },
        scTitleEn: {
          value: 'Title 2',
        },
        scProgramEn: {
          value: 'Program 2',
        },
        scDescriptionEn: {
          value: 'Short Description 2',
        },
        scCallToActionEn: {
          value: 'Call to Action 2',
        },
      },
    },
  ]

  const searchPageHref = {
    en: '/search',
    fr: '/fr/search',
  }

  const topTasks = [
    {
      properties: {
        elements: {
          scTitleEn: { title: 'titleEn' },
          scTitleFr: { title: 'titleFr' },
          scLinkURLEn: { value: '/' },
          scLinkURLFr: { value: '/' },
        },
      },
    },
  ]

  const topTaskTitle = {
    properties: {
      elements: {
        scLabelFr: { value: 'test' },
        scLabelEn: { value: 'test' },
      },
    },
  }

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      asPath: '/',
    }))
  })

  it('should render in French', () => {
    render(
      <Home
        locale="fr"
        benefits={benefits}
        featured={featured}
        topTasks={topTasks}
        topTaskTitle={topTaskTitle}
        searchPageHref={searchPageHref}
        aemPage={aemPage}
      />
    )
    const enLink = screen.getByText('English')
    expect(enLink).toBeInTheDocument()
  })

  it('should render in English', () => {
    render(
      <Home
        locale="en"
        benefits={benefits}
        featured={featured}
        topTasks={topTasks}
        topTaskTitle={topTaskTitle}
        searchPageHref={searchPageHref}
        aemPage={aemPage}
      />
    )
    const enLink = screen.getByText('Français')
    expect(enLink).toBeInTheDocument()
  })

  it('should render SearchCard', () => {
    render(
      <Home
        benefits={benefits}
        featured={featured}
        topTasks={topTasks}
        topTaskTitle={topTaskTitle}
        searchPageHref={searchPageHref}
        aemPage={aemPage}
      />
    )
    expect(screen.getByTestId('searchCard')).toBeTruthy()
  })

  it('should render serviceCanada', () => {
    render(
      <Home
        benefits={benefits}
        featured={featured}
        topTasks={topTasks}
        topTaskTitle={topTaskTitle}
        searchPageHref={searchPageHref}
        aemPage={aemPage}
      />
    )
    expect(screen.getByTestId('serviceCanada')).toBeTruthy()
  })

  it('should render topTasks', () => {
    render(
      <Home
        benefits={benefits}
        featured={featured}
        topTasks={topTasks}
        topTaskTitle={topTaskTitle}
        searchPageHref={searchPageHref}
        aemPage={aemPage}
      />
    )
    expect(screen.getByTestId('topTasks')).toBeTruthy()
  })

  it('should render cardList', () => {
    render(
      <Home
        benefits={benefits}
        featured={featured}
        topTasks={topTasks}
        topTaskTitle={topTaskTitle}
        searchPageHref={searchPageHref}
        aemPage={aemPage}
      />
    )
    expect(screen.getByTestId('cardList')).toBeTruthy()
  })

  it('should render featureBlock', () => {
    render(
      <Home
        benefits={benefits}
        featured={featured}
        topTasks={topTasks}
        topTaskTitle={topTaskTitle}
        searchPageHref={searchPageHref}
        aemPage={aemPage}
      />
    )
    expect(screen.getByTestId('featureBlock')).toBeTruthy()
  })

  it('should render contactUs', () => {
    render(
      <Home
        benefits={benefits}
        featured={featured}
        topTasks={topTasks}
        topTaskTitle={topTaskTitle}
        searchPageHref={searchPageHref}
        aemPage={aemPage}
      />
    )
    expect(screen.getByTestId('contactUs')).toBeTruthy()
  })

  it('has no a11y violations', async () => {
    const { container } = render(
      <Home
        benefits={benefits}
        featured={featured}
        topTasks={topTasks}
        topTaskTitle={topTaskTitle}
        searchPageHref={searchPageHref}
        aemPage={aemPage}
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
