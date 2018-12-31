import data from "../../data/SocialLinks"

describe("test constraints of social links data", () => {
  it ("should contain a limited number of footer items ", () => {
    expect(data.footer.length).toBeLessThanOrEqual(3)
  })

  it ("should contain attributes for all items in the footer links", () => {
    data.footer.map(i => {
      expect(i.name).toBeTruthy()
      expect(i.href).toBeTruthy()
      expect(i.icon).toBeTruthy()
    })
  })

  it ("should contain attributes for all items in the contact links", () => {
    data.contact.map(i => {
      expect(i.name).toBeTruthy()
      expect(i.href).toBeTruthy()
      expect(i.icon).toBeTruthy()
    })
  })
})