class GamesController < ApplicationController
  def index
    @games = Game.all
    ordered_games = @games.order(:created_at)
    with_games_key = {"games" => ordered_games.as_json(only: [:id, :state])}
    render json: with_games_key
  end

  def create
    @game = Game.create(game_params)
    with_games_key = {"game" => @game.as_json(only: [:id, :state])}
    render json: with_games_key
  end

  def update
    @game = Game.find(params[:id])
    @game.update(game_params)
    with_games_key = {"game" => @game.as_json(only: [:id, :state])}
    render json: with_games_key
  end

  private
  def game_params
    params.require(:game).permit(:state => [])
  end
end
