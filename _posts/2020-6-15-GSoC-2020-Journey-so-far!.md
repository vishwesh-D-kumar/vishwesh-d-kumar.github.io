---
layout: post
title: GSoC 2020 , my journey so far!
---

In March'20 , I applied for [GSoC](https://summerofcode.withgoogle.com/) under the organization of [CCExtractor Development](https://summerofcode.withgoogle.com/organizations/5176609797046272/).
My proposal got accepted on May 4th ,and thats when my journey began!.

You can read more about my project decription [here](https://summerofcode.withgoogle.com/projects/#5888598286532608) 

I would like to thank my mentor Carlos for selecting this project , and helping me through it.The CCExtractor community has helped me 
get a clear idea of my project since the proposal phase , which has been an immense help during the current phase. 

In this post I'm going to be highlighting what I've accomplished so far , and
what all I've learnt so far!

Community bonding phase
======
During this phase , I worked on understanding the AST module ,which was integral 
to building my goals for phase 1 : which is a runtime based flowchart . 

The idea was to build a program that goes provides a flowchart-esque graphcal
 output __and__ how a given function traverses through the chart
 
 ####A brief overview what AST Trees are:
 This is a brief overwiew I gave in my proposal , 
 that I've shared for others to understand
 
 Let me first introduce you to the concept of breaking down the program into parts ,an AST Tree
, or an Abstract Syntax tree .

This is basically how python understands your code flow , and executes it. 
To make it clear , let me put some trees  corresponding to  code 
```python
if a == 3:
    print "hello"
elif a==4:
	print "Ok then"
else:
	for i in range(n):
		print “final”
 
```
A cool website that helps us visualize the ast tree generated is : https://vpyast.appspot.com/

I suggest you try the code out there , and make some changes to see how 
the output changes!

Cool , isn’t It ?

Its basically a decision tree of sorts , for the compiler to follow based on values it gets .
The compile() function in python , accepts both AST Trees and Source code to compile .

In a more formal sense , (for people who have studied automatas and grammars,) , the code is tokenized, then is parsed according to a parser , based on a grammar( a set rules on how to expand symbols basically ).This is the python grammar .

The AST trees are then generated using the grammar , and are used by python to create the low level language of BYTE codes .This byte code is finally what produces your executable to be run.

I have taken the course Theory of Computation this semester, as one of my electives . I was pleasantly surprised when I was able to see the concepts of CFGs that I had learnt for my midsems . :) 


The byte code is actually way too vast for us to extract info out of( it is very explicit , and doesn’t really seem to capture the codes flow ) , so we'll be stopping at the AST trees .

Now , whats amazing about python is that it includes the ast module, which 
parses given source code and produces the ast trees corresponding to it

For resources on this : I used the following 
https://docs.python.org/3/library/ast.html

https://greentreesnakes.readthedocs.io/en/latest/index.html

An amazing resource , that covers the basics of the ast module is the
greentreesnakes documentation

A basic overview of gives us an idea of the blocks we need to focus on :
the [Control Flow Blocks](https://greentreesnakes.readthedocs.io/en/latest/nodes.html#control-flow)

These control flow blocks are what change the flow of the program based
on the current state of the program (if x==0, while(i<n))  


Now the next phase in this is then, actually visiting the nodes of the tree

The NodeVisitor Class , is a powerful class for the same
The basic functioning of the class is the following 
It takes the type of the node ,and calls the function based on the type 
For example : lets say an If node is visited by the Nodevisitor ,

1. The first function to be called would be generic_visit()

2. This func would look for the definition of the function visit_If().
If found , the node would be passed to it , and the function can hence be used 
to extract whatever info we want from it

3. Returning generic visit would allow for all the child nodes to be visited 

Now that we have a slight understanding of the same , the repository that used this idea 
was [Staticfg](https://github.com/coetaur0/staticfg)

Understanding its code , and how it worked ,gave me a deep understanding as to how
the control flow graph was built .However , having an overwiew would not allow 
me to build using the repository , and hence I took a deep dive into its source code 

While I cannot explain every function in detail here , I'll outline the basic flow 
of the program

The following were the basic ideas used  

1. On encountering a control flow node (described above), We create a control flow block

2. The block has 2 ways the program can go after the control flow block is 
visited

3. A block is created if the condition comes out to be true , and an after block is 
created if the condition is not true

4. We recursively visit the child nodes of the body of the control flow statement, 
set the current block as the after_block , and then continue building the program 



First Coding phase!(June 1st -present)
======

[This is my current repository for reference in the post](https://github.com/vishwesh-D-kumar/AlgorithmFlowVisualizer/tree/runtime_only)

I'll be outlining how I went about completing each of my targets , wherever possible .

1. Staticfg

    * [x] Add support for continue statements in staticfg 
    
    * [x] Stop breakage of code on statements of type 
        ```python
        [1,2].count()
        ```
    
    * [x] Improve Clean_cfg to make sure no empty blocks pop up in cfg
    
The above problems were faced by me in testing the repository out. I forked and worked on the errors
and sent [this PR](https://github.com/coetaur0/staticfg/pull/13) ,which has been merged into master 
It has detailed explanation of each task I went about doing


2. Generating timeline of given program
    * [x] Create A timeline generator
    
    Creating this was interesting .The resources I used were the following  : https://docs.python.org/3/library/sys.html
    After my research while writing the proposal , I was able to grasp and create a basic timeline generator for a given source file
    [This is the rough draft I came up with](https://github.com/vishwesh-D-kumar/AlgorithmFlowVisualizer/commit/015927f1c838e82a0ba9cb386c6210437e41bbc5) 
    
    * [x] Take care of statements that have no such blocks created for them  and hence cannot be mapped to any block(ie : break , continue,else)
        
    I was initially saving this while staticfg was visiting the nodes to be left out in a list known as lines to leave .
    However certain problems came up with that appraoch towards the end ( seperating else blocks from elif ) , and hence 
    I rejected that in favour of deleting unmapped lines once I have the lines to block map
    

3. Connect staticfg to timeline generation

    * [x] Map every line to its corresponding block
        
        Created a dict linesmap , mapping lines to corresponding blocks
        Done by iterating over the list of blocks ,and checking the statements in a block.
        Marking the max of the statements to the min of the statements as belonging to that in 
        this is done in function map_lines() 
    
    * [x] Create runtime depictor of the program , with a pdf being given as an output at every step
            
        Using the timeline generation above , and the linesmap , I highlighted the control flow link being used during every step in the program
            
    * [x] Remove unnecessary produced steps 
            
        Only produced output on which control flow jumps are made 
            
    * [x] Only show blocks being used in runtime 
    
4. Convert the cfg to a flowchart 

    * [x] Decide on which flowchart blocks to use
        
        Control flow blocks (if,else,while,for) are what I focused on 
    
    * [x] Devise a algorithm to break up given cfg blocks based on statements 
          
        Done by checking for blocks , and replacing them whenever neccesary,with new Decision,LoopBlocks created
    
    * [x] Create a class for the entire process
    
    * [x] Highlight control flow blocks with colors for better visual representation
    
    * [x] Align the graphviz output to look better (Maybe only use straight lines?)
            
        Learnt about graphviz documentation , and how python relates to the dot files 
        Used the findings to achieve the above two tasks
    
5. Write unittests for the same

    * [x] Write simple tests to check for continue/break statements
    * [x] Check with popular sorting algorithms
   
    Using the timeline returned , I checked the blocks being visited were in correct order or not.Checked with insertion sort , 
    selection sort , knapsack etc
    
    


