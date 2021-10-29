import Layout from '../components/organisms/Layout'
import SearchHeader from '../components/molecules/SearchHeader'

import { getLocalTopics } from './api/getData'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import en from '../locales/en'
import fr from '../locales/fr'

export default function SearchResult(props) {
  const t = props.locale === 'en' ? en : fr
  const router = useRouter()

  const [search, setSearch] = useState('')

  useEffect(() => {
    if (router.query.search) {
      setSearch(router.query.search)
    }
  }, [router.query.search])

  return (
    <Layout locale={props.locale} title="searchResult">
      <SearchHeader
        lang={props.locale}
        headerText={'Search Benefits'}
        inputText={search ?? ''}
        searchBarPlaceholder={t.searchPlaceholder}
        searchBarText={t.search}
        btnClearText={t.clearResults}
        btnClearLabel={t.clearResults}
        btnFilterText={t.filterResults}
        btnFilterLabel={t.filterResults}
        onSubmitHref="/searchResult"
      />
      <h1 className="layout-container text-3xl">
        Search results page placeholder.
      </h1>
      <h2 className="layout-container text-2xl">
        Locale selected: {props.locale}.
      </h2>
      <h2 className="layout-container text-2xl">
        Current search: {search ? search : 'No search specified'}.
      </h2>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  let topicsData = []
  let errorCode = false

  //
  // IF content enabled get the data from the api
  //

  if (!process.env.NEXT_CONTENT_API) {
    // const { apiData, error } = await getTopics(locale);

    let topics = []

    // extract data from apiData then add it to the array topics

    topicsData = topics
    // errorCode = error;
    errorCode = false
  } else {
    //
    // Else get the content from the local file
    //
    const { localData } = getLocalTopics()

    topicsData = localData
    errorCode = false
  }

  return {
    props: {
      topicsData,
      errorCode,
      locale,
    },
  }
}
