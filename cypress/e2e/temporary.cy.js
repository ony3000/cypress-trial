describe('My To Do Test', () => {
  context('임시 시나리오', () => {
    beforeEach(() => {
      cy.visit('https://todo.wellmade.club')
    })

    it("'/'로 접근 시, '/tasks'로 이동된다", () => {
      cy.url().should('include', '/tasks')
    })

    it("사이드바 숨기기", () => {
      cy.get('.NavigationDrawer_container__13Xo-').should('have.css', 'width', '200px')

      cy.get('.NavigationDrawer_button__REzTA').click()
      cy.get('.NavigationDrawer_container__13Xo-').should('have.css', 'width', '50px')
      cy.get('.NavigationDrawer_overlay__H8e8N').should('not.be.visible')
    })

    it("css에 rem 단위로 지정되어있어도 px 단위로 테스트 됨", () => {
      cy.get('.AppHeader_button__1owkb').should('have.css', 'width', '48px')
    })

    it("focus 스타일 테스트", () => {
      cy.get('.AppHeader_button__1owkb').focus()
      cy.get('.AppHeader_button__1owkb').should('to.be.focused')
      cy.get('.AppHeader_button__1owkb').should('have.css', 'outline-width', '1px')
      cy.get('.AppHeader_button__1owkb').should('have.css', 'outline-style', 'solid')
      cy.get('.AppHeader_button__1owkb').should('have.css', 'outline-color', 'rgb(255, 255, 255)')
    })
  })
})
