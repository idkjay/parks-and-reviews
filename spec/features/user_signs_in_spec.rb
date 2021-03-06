require 'rails_helper'

feature 'user signs in', %Q{
  As a signed up user
  I want to sign in
  So that I can regain access to my account
} do
  scenario 'specify valid credentials' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')
    expect(page).to have_content('Sign Out')
  end

  scenario 'specify invalid credentials' do
    visit new_user_session_path

    click_button 'Log in'
    expect(page).to have_content('Invalid Email or password')
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'shows correct links for admin' do
    auser = FactoryBot.create(:user)
    auser.role = "admin"
    auser.save

    visit new_user_session_path

    fill_in 'Email', with: auser.email
    fill_in 'Password', with: auser.password

    click_button 'Log in'

    expect(page).to have_content('New Park')
    expect(page).to have_link('Sign Out')
  end

  scenario "shows correct links for member" do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    expect(page).to have_link('Sign Out')
    expect(page).to_not have_link('New Park')
  end
end
