class CountriesController < ApplicationController

    def index
        data = File.read('dataset/ne_110m_admin_0_countries.geojson')
        render :json => data
    end

    def all_countries
        render json: Country.all()
    end

    def show
        c = Country.find_by(params[:name])
        render json: c
    end

    def country_code
        render json: Country.where(country_code: params[:code])
    end

end
