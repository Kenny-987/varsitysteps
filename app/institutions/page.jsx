'use client'
import React, { useState, useEffect } from 'react'
import '../globals.css'
import './institutions.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { faCaretDown, faCaretUp, faSearch, faUniversity } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/footer/Footer'

const Institutions = () => {
  const [showFilter, setShowFilter] = useState(false)
  const [provinceFilter, setProvinceFilter] = useState(false)
  const [institutions, setInstitutions] = useState([])
  const [query, setQuery] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20 
  const totalPages = Math.ceil(institutions.length/itemsPerPage)
 // console.log(totalPages)
  
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = institutions.slice(indexOfFirstItem, indexOfLastItem)
  const [filteredInstitutes, setFilteredInstitutes] = useState(currentData)

  
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        // Fetch institutions with pagination params
        const response =  await fetch(`/api/institutes?page=${currentPage}&limit=${itemsPerPage}`)
        const data =  await response.json()
        if (response.ok) {
          // console.log('institutes', data)
          setInstitutions(data)
        } else {
          console.log('data cannot be fetched')
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchInstitutes()
  }, []) 

  const search = async () => {
    if (query.length > 0) {
      try {
        const response =  await fetch(`/api/institutes/search?query=${query}`)
        const data =  await response.json()
        setSearchResult(data)
      } catch (error) {
        console.error(error)
      }
    }
  }


  useEffect(() => {
    setFilteredInstitutes(institutions.slice(indexOfFirstItem, indexOfLastItem))
  }, [institutions, currentPage, itemsPerPage])


  useEffect(() => {
    search()
  }, [query])

  //filter by province
  const provinceFilterFunc = (province) => {
    if (province !== '') {
      const filtered = institutions.filter((institute) => institute.province.toLowerCase() === province)
      setFilteredInstitutes(filtered)
    } else {
      setFilteredInstitutes(currentData)
    }
  }
  
  //filter by type
  const typeFilterFunc = (type) => {
    if (type !== '') {
      const filtered = institutions.filter((institute) => institute.type_name.toLowerCase() === type)
      setFilteredInstitutes(filtered)
    } else {
      setFilteredInstitutes(currentData)
    }
  }


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <section className="institutions">
      {/* Title and filter options */}
      <div className="title">
        <h2>Institutions across Zimbabwe</h2>
        <div className="filters">
          <div className="search-box">
            <div className="search">
              <input
                type="text"
                placeholder="search by institution name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {query.length > 0 && (
              <div className="search-result">
                <ul>
                  {searchResult.length > 0 ? (
                    searchResult.map((institution, index) => (
                      <li key={index}>
                        <Link
                          target="_blank"
                          href={`/institutions/institution/${institution.institution_name.replace(/\s+/g, '-')}`}
                        >
                          {institution.institution_name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <p>oops... institution not found</p>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="categories-parent">
            <div className="categories">
              <p onClick={() => setShowFilter(!showFilter)}>
                Filter By Type {showFilter ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
              </p>
              {showFilter && (
                <div className="cat-filter">
                  <button onClick={()=>{typeFilterFunc(''),setShowFilter(!showFilter)}}>All</button>
                  <button onClick={()=>{typeFilterFunc('university'),setShowFilter(!showFilter)}}>Universities</button>
                  <button onClick={()=>{typeFilterFunc('college'),setShowFilter(!showFilter)}}>Colleges</button>
                  <button>Vocational Training</button>
                </div>
              )}
            </div>
            <div className="categories">
              <p onClick={() => setProvinceFilter(!provinceFilter)}>
                Filter By Province {provinceFilter ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
              </p>
              {provinceFilter && (
                <div className="cat-filter">
                  <button onClick={() => { provinceFilterFunc(''); setProvinceFilter(!provinceFilter) }}>All</button>
                  <button onClick={() => { provinceFilterFunc('bulawayo'); setProvinceFilter(!provinceFilter) }}>Bulawayo</button>
                  <button onClick={() => { provinceFilterFunc('harare'); setProvinceFilter(!provinceFilter) }}>Harare</button>
                  <button onClick={() => { provinceFilterFunc('midlands'); setProvinceFilter(!provinceFilter) }}>Midlands</button>
                  <button onClick={()=>{provinceFilterFunc('manicaland'),setProvinceFilter(!provinceFilter)}}>Manicaland</button>
            <button onClick={()=>{provinceFilterFunc('mashonaland east'),setProvinceFilter(!provinceFilter)}}>Mashonaland East</button>
            <button onClick={()=>{provinceFilterFunc('mashonaland west'),setProvinceFilter(!provinceFilter)}}>Mashonaland West</button>
            <button onClick={()=>{provinceFilterFunc('mashonaland central'),setProvinceFilter(!provinceFilter)}}>Mashonaland Central</button>
            <button onClick={()=>{provinceFilterFunc('masvingo'),setProvinceFilter(!provinceFilter)}}>Masvingo</button>
            <button onClick={()=>{provinceFilterFunc('matabeleland north'),setProvinceFilter(!provinceFilter)}}>Matabeleland North</button>
            <button onClick={()=>{provinceFilterFunc('matabeleland south'),setProvinceFilter(!provinceFilter)}}>Matabeleland South</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* List of institutions */}
      <div className="institution-list">
        <ul>
          {filteredInstitutes.length > 0 ? (
            filteredInstitutes.map((institution, index) => (
              <li key={index}>
                <FontAwesomeIcon icon={faUniversity} />
                <Link href={`/institutions/institution/${institution.institution_name.replace(/\s+/g, '-')}`}>
                  {institution.institution_name}
                </Link>
              </li>
            ))
          ) : (
            <p>Nothing here</p>
          )}
        </ul>
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </section>
  )
}

export default Institutions
