import { create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe('ProfileStatus component', () => {
  test('status from props should be in the state', () => {
    const component = create(<ProfileStatus status='test' />)
    const instance = component.getInstance()
    expect(instance.state.status).toBe('test')
  })

  test('after creation span with status should be displayed with correct status', () => {
    const component = create(<ProfileStatus status='test' />)
    const instance = component.root
    const span = instance.findByType('span')
    expect(span.chidren).not.toBeNull()
  })
})