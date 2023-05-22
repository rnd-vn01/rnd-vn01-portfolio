import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { resetToInitialStateLanguageSlice, setStateLanguage } from 'src/redux/slice';

const DEMO_RESULTS = [{
  "code": "SI-19",
  "name": "Tinggong",
  "description": "Anterior to helix in the depression posterior to the mandibular joint when the mouth is opened.",
  "anatomy": "The needle passes through the skin, subcutis, and the glandula parotis. There are superficial temporal vessels, branches of the nervus auriculotemporalis and nervus facialis in the superficial layer; and internal carotid vessels in the deeper layer.",
  "functionalities": [
    "Tinnitus aurium",
    "Deafness",
    "Otitis media",
    "Deaf-mutism",
    "Toothache",
    "Facial paralysis"
  ],
  "technique": "Let the patient open the mouth, puncture perpendicularly or slightly downward 0.6 - 1.5 cun"
}, {
  "code": "SI-4",
  "name": "Hand-wangu",
  "description": "on the ulnar side of thje dorsal surface of the hand, in the depression between the base of os metacarpale V, the os hamatum and pisiforme",
  "anatomy": "The needle passes through the skin and subcutaneous tissue, and reaches the lateral border of the origin of the m. abductor digitiminim I. there are the dorsal venous rete of the hand, the n. ulnaris and the branches of the a. ulnaris",
  "functionalities": [
    "Arthritis of the wrist",
    "Elbow and phalangeal joints",
    "Headache",
    "Tinnitis",
    "Vomiting",
    "Cholecystitis"
  ],
  "technique": "Perpendicularly 0.3-0.5 cun"
}, {
  "code": "SI-7",
  "name": "Zhizheng",
  "description": "5 cun above the ulnar end of dorsal transverse crease of the wrist, on the line between Pt. Yanggu and Pt. Xiaohai",
  "anatomy": "The needle passes through the skin and subcutaneous tissue, and reaches the ulnar side of the m. extensor carpi ulnaris. there are the tributaries of the v. basilica and the n. cutaneous antebrachii medialis in the superficial layer and the dorsal interosseus vessel and the branches of the n. interosseus posterior in the deep layer",
  "functionalities": [
    "Rigidity of neck",
    "Pain in arm",
    "Elbow and finger",
    "Mental disorder"
  ],
  "technique": "Perpendicularly 0.8~1.5 cun"
}]

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { })
      }
    }
  }
}));

describe('SearchResults', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <SearchResults
        callbackSetNumberOfMatchingResults={jest.fn()}
        callbackSetChoosingAlphabet={jest.fn()}
        query={"SI-"}
        results={DEMO_RESULTS}
      />
    </Provider>)
  })

  afterEach(() => {
    store.dispatch(resetToInitialStateLanguageSlice())
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "search-results" })).toBeInTheDocument();
    })
  })

  it("should open the choosing alphabet screen if clicked on the icon", async () => {
    let searchResultsAlphabet = screen.getByRole("h1", { name: "search-results-alphabet" })
    fireEvent.click(searchResultsAlphabet)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "search-results-alphabet-filters" })).toBeInTheDocument();
    })

    //Choose one filter
    fireEvent.click(screen.getByRole("h1", { name: "search-results-alphabet-Z" }))
  })

  it("should display no results if change criteria to meridians only", async () => {
    let selectSearchOn = screen.getByRole("select", { name: "select-search-on" })
    fireEvent.change(selectSearchOn, { target: { value: 1 } })

    await waitFor(() => {
      expect(screen.getByRole("h1", { name: "no-results" })).toBeInTheDocument();
    })
  })

  it("should display all results if change criteria to points only", async () => {
    let selectSearchOn = screen.getByRole("select", { name: "select-search-on" })
    fireEvent.change(selectSearchOn, { target: { value: 2 } })

    await waitFor(() => {
      expect(screen.getByRole("h1", { name: "search-results-alphabet" })).toBeInTheDocument();
    })
  })

  it("should display no results if change criteria to LU meridians only", async () => {
    let selectShow = screen.getByRole("select", { name: "select-show" })
    fireEvent.change(selectShow, { target: { value: 1 } })

    await waitFor(() => {
      expect(screen.getByRole("h1", { name: "no-results" })).toBeInTheDocument();
    })
  })

  it("should display no results if change criteria to search by name", async () => {
    let selectSearchBy = screen.getByRole("select", { name: "select-search-by" })
    fireEvent.change(selectSearchBy, { target: { value: 2 } })

    await waitFor(() => {
      expect(screen.getByRole("h1", { name: "no-results" })).toBeInTheDocument();
    })
  })

  it("should display by default the caption as Tất cả if language is set to Vietnamese", async () => {
    store.dispatch(setStateLanguage({
      currentLanguage: "VI"
    }))

    await waitFor(() => {
      let searchResultsAlphabet = screen.getByRole("h1", { name: "search-results-alphabet" })
      expect(searchResultsAlphabet.innerHTML).toBe("Tất cả")
    })
  })
});
