function Button({ children }) {
  return (
    <button>{children}</button>
  );
}

describe('Button.cy.js', () => {
  it('uses custom text for the button label', () => {
    cy.mount(<Button>Click me!</Button>)
    cy.get('button').should('contains.text', 'Click me!')
  })
})
