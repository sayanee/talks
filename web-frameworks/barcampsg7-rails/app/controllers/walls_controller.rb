class WallsController < ApplicationController
  # GET /walls
  # GET /walls.xml
  def index
    @walls = Wall.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @walls }
    end
  end

  # GET /walls/1
  # GET /walls/1.xml
  def show
    @wall = Wall.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @wall }
    end
  end

  # GET /walls/new
  # GET /walls/new.xml
  def new
    @wall = Wall.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @wall }
    end
  end

  # GET /walls/1/edit
  def edit
    @wall = Wall.find(params[:id])
  end

  # POST /walls
  # POST /walls.xml
  def create
    @wall = Wall.new(params[:wall])

    respond_to do |format|
      if @wall.save
        format.html { redirect_to(@wall, :notice => 'Wall was successfully created.') }
        format.xml  { render :xml => @wall, :status => :created, :location => @wall }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @wall.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /walls/1
  # PUT /walls/1.xml
  def update
    @wall = Wall.find(params[:id])

    respond_to do |format|
      if @wall.update_attributes(params[:wall])
        format.html { redirect_to(@wall, :notice => 'Wall was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @wall.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /walls/1
  # DELETE /walls/1.xml
  def destroy
    @wall = Wall.find(params[:id])
    @wall.destroy

    respond_to do |format|
      format.html { redirect_to(walls_url) }
      format.xml  { head :ok }
    end
  end
end
