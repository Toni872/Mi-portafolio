import { render, screen, waitFor } from '@testing-library/react'
import { Hero } from '@/components/portfolio/Hero'

describe('Hero Component', () => {
  const mockProps = {
    name: 'Antonio Lloret',
    skill: 'Full Stack Developer',
    about: 'Passionate developer with expertise in modern web technologies.',
  }

  it('renders name correctly', () => {
    render(<Hero {...mockProps} />)
    const names = screen.getAllByText('Antonio Lloret')
    expect(names.length).toBeGreaterThan(0)
    // Check that at least one is an h1
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('Antonio Lloret')
  })

  it('displays typing effect for skill', async () => {
    render(<Hero {...mockProps} />)
    // Wait for typing animation to start
    await waitFor(
      () => {
        const skillElements = screen.getAllByText(/full stack developer/i)
        expect(skillElements.length).toBeGreaterThan(0)
      },
      { timeout: 3000 }
    )
  })

  it('displays about text', () => {
    render(<Hero {...mockProps} />)
    expect(screen.getByText(/passionate developer/i)).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<Hero {...mockProps} />)
    expect(screen.getByText(/ver mi trabajo/i)).toBeInTheDocument()
    expect(screen.getByText(/contáctame/i)).toBeInTheDocument()
  })

  it('has scroll indicator', () => {
    render(<Hero {...mockProps} />)
    const scrollButton = screen.getByLabelText(/scroll to about/i)
    expect(scrollButton).toBeInTheDocument()
  })
})

