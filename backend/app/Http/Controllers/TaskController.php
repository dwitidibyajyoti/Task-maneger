<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\TryCatch;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'task' => 'required|max:60',
            'priority' => 'required|in:1,2,3'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        try {
            $task = new Task();
            $task->name = $request->task;
            $task->priority = $request->priority;
            $task->save();
        } catch (\Throwable $th) {
            return response()->json(['errors' => 'Unable to Store task'], 401);
        }

        return response()->json(['success' => 'Store task successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $task = Task::where('deleted_at',null)->orderBy('priority', 'ASC')->get();

        return response()->json(['date' => json_decode($task)], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $updateArry = [];
            if ($request->task) {
                $updateArry['name'] = $request->task;
            }
            if ($request->priority != 4) {
                $updateArry['priority'] = $request->priority;
            }
            Task::where("id", $id)->update($updateArry);
        } catch (\Throwable $th) {
            return response()->json(['errors' => 'Unable to update task'], 401);
        }
        return response()->json(['success' => 'UPdate task successfully'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {


        try {
             Task::find($id)->delete();
        } catch (\Throwable $th) {
            return response()->json(['errors' => 'error while delete table'], 401);
        }


        return response()->json(['errors' => 'task deleted successfully'], 200);
    }
}
