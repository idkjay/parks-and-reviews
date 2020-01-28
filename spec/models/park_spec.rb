require 'rails_helper'

RSpec.describe Park, type: :model do
  it { is_expected.to validate_presence_of(:name)}
  it { is_expected.to validate_presence_of(:city)}
  it { is_expected.to validate_presence_of(:state)}
  it { is_expected.to validate_presence_of(:zip)}
  it { is_expected.to validate_presence_of(:rating)}
  it { is_expected.to validate_presence_of(:photo)}
end