class Api::TweetsController < ApplicationController
  def index
    render json: TwitterClient.home_timeline
  end

  def search
    render json: TwitterClient.search(params[:term])
  end

  def tweet
    render json: TwitterClient.tweet(params[:tweet])
  end
  
end