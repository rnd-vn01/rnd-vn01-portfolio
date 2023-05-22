import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ItemDetailEdit } from './ItemDetailEdit';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { resetToInitialStateAuthSlice, setStateAuth } from 'src/redux/slice';

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
    location: {
      pathname: []
    }
  }),
  useLocation: () => ({
    pathname: '',
    search: ''
  })
}));

const DEMO_POINT = {
  code: "GB-20",
  name: "Name",
  description: "Description",
  functionalities: ["F1", "F2"],
  caution: "Caution",
  technique: "Technique",
  anatomy: "Anatomy"
}

const DEMO_MERIDIAN = {
  code: "LU",
  name: "Lung",
  description: "Description for Lung",
  diseases: "Diseases for Lung",
  points: ["P1", "P2"]
}

describe('ItemDetailEdit', () => {
  afterEach(() => {
    store.dispatch(resetToInitialStateAuthSlice());
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <ItemDetailEdit
        item={{}}
        isPoint={true} />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "item-detail-edit" })).toBeInTheDocument();
    })
  })

  it("should remove one subitem if clicking on the trash bin icon", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true} />
    </Provider>)

    //Remove the second functionality
    const secondItemRemoveIcon = screen.getByTestId("remove-icon-1")
    fireEvent.click(secondItemRemoveIcon)

    await waitFor(() => {
      const functionalities = screen.getAllByRole("point-functionality")
      expect(functionalities.length).toBe(1)
      expect(functionalities[0].getAttribute("value")).toBe("F1")
    })
  })

  it("should add one subitem if type in and click on add button", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true} />
    </Provider>)

    const inputAddSubItem = screen.getByRole("input", { name: "input-add-subitem" })
    fireEvent.change(inputAddSubItem, { target: { value: "F3" } })

    const buttonAddSubItem = screen.getByRole("button", { name: "button-add-subitem" })
    fireEvent.click(buttonAddSubItem)

    await waitFor(() => {
      const functionalities = screen.getAllByRole("point-functionality")
      expect(functionalities.length).toBe(3)
      expect(functionalities[2].getAttribute("value")).toBe("F3")
    })
  })

  it("should change the content of field name when typed in new value", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true} />
    </Provider>)

    const inputName = screen.getByRole("input", { name: "input-name" })
    fireEvent.change(inputName, { target: { value: "New Name" } })

    await waitFor(() => {
      expect(inputName.getAttribute("value")).toBe("New Name")
    })
  })

  it("should change the content of field code when typed in new value", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true} />
    </Provider>)

    const inputCode = screen.getByRole("input", { name: "input-code" })
    fireEvent.change(inputCode, { target: { value: "New Code" } })

    await waitFor(() => {
      expect(inputCode.getAttribute("value")).toBe("New Code")
    })
  })

  it("should change the content of one subitem if type in new value", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true} />
    </Provider>)

    const functionalities = screen.getAllByRole("point-functionality")
    fireEvent.change(functionalities[1], { target: { value: "F2 Updated" } })

    await waitFor(() => {
      expect(functionalities[1].getAttribute("value")).toBe("F2 Updated")
    })
  })

  it("should callback update item if click on submit button", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))
    const mockCallbackUpdateDetail = jest.fn();

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true}
        callbackUpdateDetail={mockCallbackUpdateDetail} />
    </Provider>)

    const inputCode = screen.getByRole("input", { name: "input-code" })
    fireEvent.change(inputCode, { target: { value: "New Code" } })

    const functionalities = screen.getAllByRole("point-functionality")
    fireEvent.change(functionalities[1], { target: { value: "F2 Updated" } })

    const buttonSubmit = screen.getByRole("div", { name: "button-submit" })
    fireEvent.click(buttonSubmit)

    await waitFor(() => {
      let UPDATED_ITEM = JSON.parse(JSON.stringify(DEMO_POINT))
      UPDATED_ITEM["code"] = "New Code"
      UPDATED_ITEM["functionalities"][1] = "F2 Updated"

      expect(mockCallbackUpdateDetail).toHaveBeenCalledWith(UPDATED_ITEM)
    })
  })

  it("should add one subitem if type in and press enter", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true} />
    </Provider>)

    const inputAddSubItem = screen.getByRole("input", { name: "input-add-subitem" })
    fireEvent.change(inputAddSubItem, { target: { value: "F3" } })
    fireEvent.keyDown(inputAddSubItem, { key: 'Enter', code: 13 });

    await waitFor(() => {
      const functionalities = screen.getAllByRole("point-functionality")
      expect(functionalities.length).toBe(3)
      expect(functionalities[2].getAttribute("value")).toBe("F3")
    })
  })

  it("should change the content of one subitem of meridian if type in new value", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_MERIDIAN))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={false} />
    </Provider>)

    const points = screen.getAllByRole("meridian-point")
    fireEvent.change(points[1], { target: { value: "P2 Updated" } })

    await waitFor(() => {
      expect(points[1].getAttribute("value")).toBe("P2 Updated")
    })
  })

  it("should remove one subitem if clicking on the trash bin icon for meridian", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_MERIDIAN))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={false} />
    </Provider>)

    //Remove the second functionality
    const secondItemRemoveIcon = screen.getByTestId("remove-point-1")
    fireEvent.click(secondItemRemoveIcon)

    await waitFor(() => {
      const functionalities = screen.getAllByRole("meridian-point")
      expect(functionalities.length).toBe(1)
      expect(functionalities[0].getAttribute("value")).toBe("P1")
    })
  })

  it("should add one subitem if type in and click on add button for meridian", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_MERIDIAN))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={false} />
    </Provider>)

    const inputAddSubItem = screen.getByRole("input", { name: "input-add-point" })
    fireEvent.change(inputAddSubItem, { target: { value: "P3" } })

    const buttonAddSubItem = screen.getByRole("button", { name: "button-add-point" })
    fireEvent.click(buttonAddSubItem)

    await waitFor(() => {
      const functionalities = screen.getAllByRole("meridian-point")
      expect(functionalities.length).toBe(3)
      expect(functionalities[2].getAttribute("value")).toBe("P3")
    })
  })

  it("should add one subitem if type in and press enter for meridian", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_MERIDIAN))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={false} />
    </Provider>)

    const inputAddSubItem = screen.getByRole("input", { name: "input-add-point" })
    fireEvent.change(inputAddSubItem, { target: { value: "P3" } })
    fireEvent.keyDown(inputAddSubItem, { key: 'Enter', code: 13 });

    await waitFor(() => {
      const functionalities = screen.getAllByRole("meridian-point")
      expect(functionalities.length).toBe(3)
      expect(functionalities[2].getAttribute("value")).toBe("P3")
    })
  })

  it("should change the content of field caution when typed in new value", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true} />
    </Provider>)

    const inputCaution = screen.getByRole("textarea", { name: "textarea-caution" })
    fireEvent.change(inputCaution, { target: { value: "New Caution" } })

    await waitFor(() => {
      expect(inputCaution.innerHTML).toBe("New Caution")
    })
  })

  it("should redirect to details page if clicking on cancel button", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true} />
    </Provider>)

    const buttonCancel = screen.getByRole("div", { name: "button-cancel" })
    fireEvent.click(buttonCancel)

    await waitFor(() => {
      expect(true).toBeTruthy();
    })
  })

  it("should callback update item if click on submit button for meridian", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_MERIDIAN))
    const mockCallbackUpdateDetail = jest.fn();

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={false}
        callbackUpdateDetail={mockCallbackUpdateDetail} />
    </Provider>)

    const inputCode = screen.getByRole("input", { name: "input-code" })
    fireEvent.change(inputCode, { target: { value: "New Code" } })

    const points = screen.getAllByRole("meridian-point")
    fireEvent.change(points[1], { target: { value: "P2 Updated" } })

    const buttonSubmit = screen.getByRole("div", { name: "button-submit" })
    fireEvent.click(buttonSubmit)

    await waitFor(() => {
      let UPDATED_ITEM = JSON.parse(JSON.stringify(DEMO_MERIDIAN))
      UPDATED_ITEM["code"] = "New Code"
      UPDATED_ITEM["points"][1] = "P2 Updated"

      expect(mockCallbackUpdateDetail).toHaveBeenCalledWith(UPDATED_ITEM)
    })
  })

  it("should add not critical fields if added during edit", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))
    delete ITEM["anatomy"]
    const mockCallbackUpdateDetail = jest.fn();

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true}
        callbackUpdateDetail={mockCallbackUpdateDetail} />
    </Provider>)

    const inputAnatomy = screen.getByRole("textarea", { name: "textarea-anatomy" })
    fireEvent.change(inputAnatomy, { target: { value: "New Anatomy" } })

    const buttonSubmit = screen.getByRole("div", { name: "button-submit" })
    fireEvent.click(buttonSubmit)

    await waitFor(() => {
      let UPDATED_ITEM = JSON.parse(JSON.stringify(DEMO_POINT))
      UPDATED_ITEM["anatomy"] = "New Anatomy"

      expect(mockCallbackUpdateDetail).toHaveBeenCalledWith(UPDATED_ITEM)
    })
  })

  it("should skip critical fields if left as blank during edit", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))
    const mockCallbackUpdateDetail = jest.fn();

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true}
        callbackUpdateDetail={mockCallbackUpdateDetail} />
    </Provider>)

    const inputAnatomy = screen.getByRole("textarea", { name: "textarea-anatomy" })
    fireEvent.change(inputAnatomy, { target: { value: "" } })

    const buttonSubmit = screen.getByRole("div", { name: "button-submit" })
    fireEvent.click(buttonSubmit)

    await waitFor(() => {
      let UPDATED_ITEM = JSON.parse(JSON.stringify(DEMO_POINT))
      delete UPDATED_ITEM["anatomy"]

      expect(mockCallbackUpdateDetail).toHaveBeenCalledWith(UPDATED_ITEM)
    })
  })

  it("should not add one subitem if leave input box as empty and click on add button for point", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true} />
    </Provider>)

    const inputAddSubItem = screen.getByRole("input", { name: "input-add-subitem" })
    fireEvent.change(inputAddSubItem, { target: { value: "" } })

    const buttonAddSubItem = screen.getByRole("button", { name: "button-add-subitem" })
    fireEvent.click(buttonAddSubItem)

    await waitFor(() => {
      const functionalities = screen.getAllByRole("point-functionality")
      expect(functionalities.length).toBe(2)
    })
  })

  it("should not add one subitem if leave input box as empty and press enter for point", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true} />
    </Provider>)

    const inputAddSubItem = screen.getByRole("input", { name: "input-add-subitem" })
    fireEvent.change(inputAddSubItem, { target: { value: "" } })
    fireEvent.keyDown(inputAddSubItem, { key: 'Enter', code: 13 });

    await waitFor(() => {
      const functionalities = screen.getAllByRole("point-functionality")
      expect(functionalities.length).toBe(2)
    })
  })

  it("should not add one subitem if leave input box as empty and click on add button for meridian", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_MERIDIAN))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={false} />
    </Provider>)

    const inputAddSubItem = screen.getByRole("input", { name: "input-add-point" })
    fireEvent.change(inputAddSubItem, { target: { value: "" } })

    const buttonAddSubItem = screen.getByRole("button", { name: "button-add-point" })
    fireEvent.click(buttonAddSubItem)

    await waitFor(() => {
      const functionalities = screen.getAllByRole("meridian-point")
      expect(functionalities.length).toBe(2)
    })
  })

  it("should not add one subitem if leave input box as empty and press enter for meridian", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_MERIDIAN))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={false} />
    </Provider>)

    const inputAddSubItem = screen.getByRole("input", { name: "input-add-point" })
    fireEvent.change(inputAddSubItem, { target: { value: "" } })
    fireEvent.keyDown(inputAddSubItem, { key: 'Enter', code: 13 });

    await waitFor(() => {
      const functionalities = screen.getAllByRole("meridian-point")
      expect(functionalities.length).toBe(2)
    })
  })

  it("should not add one subitem if press other key besides enter for point", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true} />
    </Provider>)

    const inputAddSubItem = screen.getByRole("input", { name: "input-add-subitem" })
    fireEvent.change(inputAddSubItem, { target: { value: "F3" } })
    fireEvent.keyDown(inputAddSubItem, { key: 'Shift', code: 16 });

    await waitFor(() => {
      const functionalities = screen.getAllByRole("point-functionality")
      expect(functionalities.length).toBe(2)
    })
  })

  it("should not add one subitem if press other key besides enter for meridian", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_MERIDIAN))

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={false} />
    </Provider>)

    const inputAddSubItem = screen.getByRole("input", { name: "input-add-point" })
    fireEvent.change(inputAddSubItem, { target: { value: "P3" } })
    fireEvent.keyDown(inputAddSubItem, { key: 'Shift', code: 16 });

    await waitFor(() => {
      const functionalities = screen.getAllByRole("meridian-point")
      expect(functionalities.length).toBe(2)
    })
  })

  it("should leave space as empty if passed no points for meridian", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_MERIDIAN))
    delete ITEM["points"]

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={false} />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "item-detail-edit" })).toBeInTheDocument();
    })
  })

  it("should style textarea as 3 rows if content is between 200 and 350 characters", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))
    ITEM["anatomy"] = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true} />
    </Provider>)

    await waitFor(() => {
      const inputAnatomy = screen.getByRole("textarea", { name: "textarea-anatomy" })
      expect((inputAnatomy as any).rows).toBe(3)
    })
  })

  it("should style textarea as 4 rows if content is more than 350 characters", async () => {
    const ITEM = JSON.parse(JSON.stringify(DEMO_POINT))
    ITEM["anatomy"] = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu"

    render(<Provider store={store}>
      <ItemDetailEdit
        item={ITEM}
        isPoint={true} />
    </Provider>)

    await waitFor(() => {
      const inputAnatomy = screen.getByRole("textarea", { name: "textarea-anatomy" })
      expect((inputAnatomy as any).rows).toBe(4)
    })
  })
})
